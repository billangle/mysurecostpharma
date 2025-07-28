import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
import { SureCostDbAlbStack } from '../lib/SureCostDbAlb-stack';


/**
 * REQUIRES 
 * 
 * DEPLOY_ENV
 * 
 * aws configure sso for REI
 * export ADMINUSER
 * 
 * 
 */


const environment=process.env.DEPLOY_ENV;
const account=process.env.ACCOUNT;

const region=process.env.REGION;
const db= process.env.DB_PASS;
const type= process.env.CONTAINER_TYPE;


const envdata = fs.readFileSync("../" + environment+ '/cdk-spec.json', 'utf8');
const configData = JSON.parse(envdata);


const app = new cdk.App();
new SureCostDbAlbStack(app, 'MySureCostDbAlbStack', {
  env: { region: region, account: account },
  configData: configData, account: account , dbpass: db, containerType: type
});