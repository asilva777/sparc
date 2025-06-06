<?php
require 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $organization = $_POST['organization'];
    $position = $_POST['position'];
    $email = $_POST['email'];
    $contactNumber = $_POST['contactNumber'];
    $coping = $_POST['coping'];
    $adaptability = $_POST['adaptability'];
    $sensitivity = $_POST['sensitivity'];
    $exposure = $_POST['exposure'];
    $averageScore = $_POST['averageScore'];
    $interpretation = $_POST['interpretation'];

    // Save to database
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        $stmt = $pdo->prepare('INSERT INTO responses (first_name, last_name, organization, position, email, contact_number, coping, adaptability, sensitivity, exposure, average_score, interpretation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$firstName, $lastName, $organization, $position, $email, $contactNumber, $coping, $adaptability, $sensitivity, $exposure, $averageScore, $interpretation]);
    } catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
        exit();
    }

    // Prepare email content
    $subject = "SPARC Assessment Results";
    $message = "
    Dear $firstName $lastName,

    Thank you for completing the SPARC assessment. Here are your results:

    Coping Capacity: $coping
    Adaptability: $adaptability
    Sensitivity Reduction: $sensitivity
    Exposure Control: $exposure
    Average Score: $averageScore

    Interpretation: $interpretation

    Best regards,
    ASilva Innovations
    ";

    $headers = "From: admin@asilvainnovations.com";

    // Send email to participant
    mail($email, $subject, $message, $headers);

    // Send email to admin
    mail("admin@asilvainnovations.com", "New SPARC Assessment Submission", $message, $headers);

    // Redirect to thank you page
    header("Location: thank_you.html");
    exit();
}
?>
