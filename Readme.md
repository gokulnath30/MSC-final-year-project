
# Mobile Object Detection and Counting Application

## Overview

The Mobile Object Detection and Counting Application is a Progressive Web Application (PWA) developed for mobile devices. It utilizes JavaScript and HTML to capture images from the device's camera, run object detection using a PyTorch machine learning model (converted to TensorFlow for web-based inference), and count the detected objects. The application also incorporates Google mobile authentication with OTP validation, object templates, image manipulation features, and data storage in Firebase and local browser caches. Users can generate reports in Excel and PDF formats, and the application includes a history page to track object detection results over time.

## Key Features

- **Camera Integration:** Capture images seamlessly using the device's camera.
- **Object Detection:** Identify and count objects using a PyTorch machine learning model converted to TensorFlow.
- **Google Mobile Authentication with OTP Validation:** Secure user login with two-factor authentication.
- **Object Templates:** Choose from predefined object templates for accurate detection.
- **Image Manipulation:** Crop captured images for focused analysis.
- **Gallery Image Upload:** Upload images from the mobile device's gallery.
- **Confidence Level Adjustment:** Customize confidence levels for object detection.
- **Data Storage and Retrieval:** Utilize Firebase for real-time data storage and retrieval.
- **Local Browser Caching:** Enable offline functionality with local browser caching.
- **Report Generation:** Generate reports in Excel and PDF formats for analysis.
- **History Page:** Track object detection results, timestamps, and sample images.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000` by default.

## Usage

1. Open the application in a web browser.
2. Authenticate using Google mobile authentication.
3. Capture images from the camera or upload from the gallery.
4. Adjust confidence levels for object detection if needed.
5. Explore the history page for past detection results.
6. Generate reports for analysis.



## License

This project is licensed under the [MIT License](LICENSE).

## Application Screenshots

![Login](imgs\1.jpg)
![Home](imgs\3.jpg)
![Camera](imgs\5.jpg)
![pre](imgs\9.png)

