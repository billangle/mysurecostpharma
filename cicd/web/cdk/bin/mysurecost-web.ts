#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
import { SureCostAppStack } from '../lib/mysurecost-app-stack';


/**
 * REQUIRES 
 * 
 * DEPLOY_ENV
 * 
 * 
 */


const environment=process.env.DEPLOY_ENV;
const account=process.env.ACCOUNT;
const region=process.env.REGION;

const envdata = fs.readFileSync("../" + environment+ '/cdk-spec.json', 'utf8');
const configData = JSON.parse(envdata);

const app = new cdk.App();
new SureCostAppStack(app, 'SureCostAppStack', {
  env: { region: region, account: account },
  configData: configData
 
});