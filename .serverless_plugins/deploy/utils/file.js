"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.extractFileName = (pathname) => {
    return pathname.split('/').pop() || '';
};
exports.extractExtension = (pathname) => {
    return pathname.split('.').pop() || '';
};
exports.isDirectory = (pathname) => __awaiter(this, void 0, void 0, function* () {
    const pathState = yield fs_1.default.promises.stat(pathname);
    return pathState.isDirectory();
});
exports.getFilePathnames = (dirPathname) => __awaiter(this, void 0, void 0, function* () {
    const pathnames = yield fs_1.default.promises.readdir(dirPathname);
    let allPathnames = [];
    for (const pathname of pathnames) {
        const absoluteFilePathname = path_1.default.join(dirPathname, pathname);
        if (yield exports.isDirectory(absoluteFilePathname)) {
            const nestedFilePathnames = yield exports.getFilePathnames(absoluteFilePathname);
            allPathnames = allPathnames.concat(nestedFilePathnames);
        }
        else {
            allPathnames = allPathnames.concat(absoluteFilePathname);
        }
    }
    return allPathnames;
});
exports.readFile = (pathname) => {
    return fs_1.default.promises.readFile(pathname);
};
exports.writeFile = (pathname, data) => __awaiter(this, void 0, void 0, function* () {
    yield ensureWriteProcess(pathname);
    return fs_1.default.promises.writeFile(pathname, data, { encoding: 'utf8' });
});
const existPathname = (pathname) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fs_1.default.promises.stat(pathname);
        return true;
    }
    catch (err) {
        return false;
    }
});
const createDir = (pathname) => {
    return fs_1.default.promises.mkdir(pathname);
};
const ensureWriteProcess = (pathname) => __awaiter(this, void 0, void 0, function* () {
    const fileDirname = path_1.default.dirname(pathname);
    if (yield existPathname(fileDirname)) {
        return;
    }
    yield ensureWriteProcess(fileDirname);
    yield createDir(fileDirname);
});
