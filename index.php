<?php
require_once 'config.php';
require_once 'controllers/loginController.php';
$login = new Login();
$login->index();