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
const cloudformation_1 = __importDefault(require("aws-sdk/clients/cloudformation"));
const describeStacks = (cf, stackName) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cf.describeStacks({ StackName: stackName }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
});
exports.getApiEndpoint = ({ stackName, region, }) => __awaiter(this, void 0, void 0, function* () {
    console.log(stackName, region);
    const cf = new cloudformation_1.default({ region });
    const data = yield describeStacks(cf, stackName);
    const statcks = data.Stacks;
    if (!statcks) {
        throw new Error('[CloufFormation]No statkcs');
    }
    const outputs = statcks[0].Outputs;
    if (!outputs) {
        throw new Error('[CloufFormation]No outputs');
    }
    const endpointOutput = outputs.find(output => output.OutputKey === 'ServiceEndpoint');
    if (!endpointOutput) {
        throw new Error('[CloufFormation]No endpoint output');
    }
    const endpoint = endpointOutput.OutputValue;
    if (!endpoint) {
        throw new Error('[CloufFormation]No endpoint');
    }
    return endpoint;
});
