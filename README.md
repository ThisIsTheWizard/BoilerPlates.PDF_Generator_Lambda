# BoilerPlates.PDF_Generator_Lambda

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?logo=awslambda)](https://aws.amazon.com/lambda/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-blue?logo=amazons3)](https://aws.amazon.com/s3/)
[![SQS](https://img.shields.io/badge/AWS-SQS-FF9900?logo=amazonaws)](https://aws.amazon.com/sqs/)
[![Lambda Layers](https://img.shields.io/badge/Lambda-Layers-purple?logo=awslambda)](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-Core-40B5A4?logo=puppeteer)](https://pptr.dev/)
[![Chromium](https://img.shields.io/badge/@sparticuz/chromium-Lambda-4285F4?logo=googlechrome)](https://github.com/Sparticuz/chromium)

AWS Lambda function that processes SQS messages containing HTML content, converts it to PDF format using Puppeteer, and stores the file in S3.

---

## 📖 Overview

This project is an **AWS Lambda function** that:

1. Listens to **SQS messages** containing HTML content
2. Converts HTML to **PDF file** using **Puppeteer**
3. Stores the PDF file in an **S3 bucket**.

---

## ⚙️ Architecture

```

SQS → Lambda → Puppeteer (HTML to PDF) → S3

```

---

## 🛠 Tech Stack

- **Runtime**: Node.js 22.x
- **AWS Services**: Lambda, S3, SQS
- **Libraries**:
  - [Puppeteer](https://pptr.dev/) – HTML to PDF conversion
  - [@sparticuz/chromium](https://github.com/Sparticuz/chromium) – Chromium for AWS Lambda

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/ThisIsTheWizard/BoilerPlates.PDF_Generator_Lambda.git

cd BoilerPlates.PDF_Generator_Lambda
```

Install dependencies:

```bash
npm install
```

Run the service using using AWS SAM CLI:

```bash
npm run dev
```

**Note**: For local development, ensure you have Chrome/Chromium installed on your system. The code automatically detects SAM local environment and uses system Chromium instead of the layer path.

### Lambda Layer Setup (Optional)

For better performance, you can use a Lambda layer for Chromium:

1. **Create Puppeteer Layer:**
   ```bash
   # Create layer directory
   mkdir puppeteer-layer
   cd puppeteer-layer
   
   # Install chromium and puppeteer-core in layer structure
   npm init -y
   npm install @sparticuz/chromium puppeteer-core
   
   # Create layer zip
   zip -r puppeteer-layer.zip node_modules/
   ```

2. **Deploy Layer:**
   ```bash
   aws lambda publish-layer-version \
     --layer-name puppeteer \
     --zip-file fileb://puppeteer-layer.zip \
     --compatible-runtimes nodejs22.x
   ```

3. **Add Layer to template.yaml:**
   ```yaml
   PDFGeneratorService:
     Type: AWS::Serverless::Function
     Properties:
       # ... other properties
       Layers:
         - arn:aws:lambda:region:account:layer:puppeteer:1
   ```

---

## 📩 Example SQS Message

```json
{
  "html": "<html><body><h1>Hello World</h1><p>This is a test PDF.</p></body></html>"
}
```

---

## 📝 License

This boilerplate is provided under the MIT License.
Feel free to use and modify it for your projects.

---

👋 Created by [Elias Shekh](https://sheikhthewizard.world).
If you find this useful, ⭐ the repo or reach out!
