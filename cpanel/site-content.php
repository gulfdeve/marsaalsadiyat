<?php
/**
 * Upload this file to cPanel next to site.json, e.g. public_html/content/site-content.php
 * Also upload a copy of content/site.json from this repo into the same folder.
 *
 * Vercel env:
 *   CONTENT_REMOTE_URL=https://your-cpanel-domain.com/content/site-content.php
 *   CONTENT_REMOTE_SECRET=the-same-value-as-below
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$SECRET = 'change-this-to-a-long-random-string';
$FILE = __DIR__ . '/site.json';

$provided = $_SERVER['HTTP_X_CONTENT_SECRET'] ?? '';
if (!hash_equals($SECRET, $provided)) {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    if (!is_file($FILE)) {
        http_response_code(404);
        echo json_encode(['message' => 'site.json is missing.']);
        exit;
    }
    readfile($FILE);
    exit;
}

if ($method === 'PUT' || $method === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Empty body.']);
        exit;
    }

    json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid JSON.']);
        exit;
    }

    $temp = $FILE . '.' . bin2hex(random_bytes(6)) . '.tmp';
    if (file_put_contents($temp, $raw) === false) {
        http_response_code(500);
        echo json_encode(['message' => 'Could not write site.json. Check folder permissions (755 folder, 644 file).']);
        exit;
    }
    if (!rename($temp, $FILE)) {
        @unlink($temp);
        http_response_code(500);
        echo json_encode(['message' => 'Could not replace site.json.']);
        exit;
    }

    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['message' => 'Use GET or PUT.']);
