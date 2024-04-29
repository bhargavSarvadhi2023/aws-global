# AWS GLOBAL

# AWS Operations Package

This package provides utility functions for interacting with AWS services such as S3. It simplifies tasks like uploading images, uploading files, deleting images, and renaming images on AWS S3 buckets.

## Installation

To install aws , you can use github repository urls

You can make package name add github repository url in package.json file

EXAMPLE

"aws-global":"git+https://github.com/bhargavSarvadhi2023/aws-global.git"

```bash
yarn add aws-global
```

````bash
# Usage

Import the package as follows:

```javascript
import aws from 'package_name';
````

### 1. Upload Base64 Image

```javascript
const imageUrl = await aws.base64_upload(id, base64Image, mimeType);
```

**Parameters:**

-   `id`: Unique identifier for the image.
-   `base64Image`: Base64 encoded string of the image.
-   `mimeType`: MIME type of the image.

### 2.Upload Image

```javascript
const imageUrl = await aws.upload_image(filename, imageData);
```

**Parameters:**

-   `filename`: Name of the image file.
-   `imageData`: Object containing image buffer and mimetype.

### 3. Delete Image

```javascript
const success = await aws.delete_image(filename);
```

**Parameters:**

-   `filename`: Name of the image file to be deleted.

### 4.Rename Image

```javascript
const success = await aws.rename_image(oldKey);
```

**Parameters:**

-   `oldKey`: Old key/name of the image.

**.dot env file**

```

REGION=<your_aws_region>
BUCKET=<your_bucket_name>
AWS_ACCESS_KEY=<your_aws_access_key>
SECRET_ACCESS_KEY=<your_aws_secret_access_key>
AWS_FOLDER_NAME=<your_folder_name>

```
