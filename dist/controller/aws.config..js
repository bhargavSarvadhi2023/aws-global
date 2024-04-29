"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const dotenv_1 = require("dotenv");
const constant_1 = require("../constant");
const logger_1 = require("../logger/logger");
const index_1 = require("../utils/index");
(0, dotenv_1.config)();
const region = process.env.REGION;
const bucket = process.env.BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const uploadConfig = {
    region,
    bucket,
    accessKeyId,
    secretAccessKey,
};
const s3 = new s3_1.default(uploadConfig);
class AWS {
    base64_upload(id, img, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parts = type.split('/')[1];
                const buf = Buffer.from(img.split(';base64,').pop(), 'base64');
                const filename = `${process.env.AWS_FOLDER_NAME}/${id}.${parts}`;
                const upload = {
                    Bucket: bucket,
                    Key: filename,
                    Body: buf,
                    ContentType: type,
                };
                const { Location } = yield s3.upload(upload).promise();
                if (!Location)
                    throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
                return Location;
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        });
    }
    upload_image(filename, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = `${process.env.AWS_FOLDER_NAME}/${filename}`;
                const upload = {
                    Bucket: bucket,
                    Key: file,
                    Body: data.image_buff,
                    ContentType: data.mimetype,
                };
                const { Location } = yield s3.upload(upload).promise();
                if (!Location) {
                    throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
                }
                return Location;
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        });
    }
    upload_filetype(filename, fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contentType = 'application/octet-stream';
                const file = `${process.env.AWS_FOLDER_NAME}/${filename}`;
                const params = {
                    Bucket: bucket,
                    Key: file,
                    Body: fileContent,
                    ContentType: contentType,
                };
                const { Location } = yield s3.upload(params).promise();
                if (!Location)
                    throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
                return Location;
            }
            catch (error) {
                logger_1.logger.error(`Error uploading file to S3: ${error.message}`);
                throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
            }
        });
    }
    delete_image(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = `${process.env.AWS_FOLDER_NAME}/${filename}`;
                const params = {
                    Bucket: bucket,
                    Key: image,
                };
                s3.deleteObject(params, (deleteErr, deleteData) => {
                    if (deleteErr) {
                        logger_1.logger.error(`Error deleting object: ${deleteErr.message}`);
                        return false;
                    }
                    else {
                        logger_1.logger.info(`Object deleted: ${filename}`);
                        return true;
                    }
                });
                return true;
            }
            catch (error) {
                logger_1.logger.error(`Error uploading file to S3: ${error.message}`);
                throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
            }
        });
    }
    rename_image(oldKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = `${process.env.FOLDER_NAME2}/${oldKey}`;
                yield s3
                    .copyObject({
                    Bucket: bucket,
                    CopySource: `/${bucket}/${image}`,
                    Key: `${process.env.FOLDER_NAME2}/default-image1.jpg`,
                })
                    .promise();
                return true;
            }
            catch (error) {
                logger_1.logger.error(`Error Eename Image : ${error.message}`);
                throw new index_1.AppError(constant_1.RES_TYPES.NOT_UPLOAD, constant_1.ERRORTYPES.UNKNOWN_ERROR);
            }
        });
    }
}
exports.AWS = AWS;
