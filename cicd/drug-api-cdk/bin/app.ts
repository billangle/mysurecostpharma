#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { DrugApiStack } from '../lib/drug-api-stack';


const account=process.env.ACCOUNT;

const region=process.env.REGION;

const app = new cdk.App();
new DrugApiStack(app, 'DrugApiStack', {
    env: { region: region, account: account },
    account: account ? account : ""
});
