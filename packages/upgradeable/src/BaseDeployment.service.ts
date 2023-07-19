import { DeployResult, Deployment } from "@eonian/hardhat-deploy/types";
import { Address } from "@eonian/hardhat-deploy/types";
import { DeployArgs, DeploymentsService, LifecycleDeploymentService } from "./LifecycleDeployment.service";
import { Logger } from "./logger/Logger";

export interface DependenciesService {
    resolve: (names: Array<string>) => Promise<Deployment[]>;
}

export interface NamedAccounts {
    [name: string]: Address;

    /** Required for deployment */
    deployer: Address
}

export interface AccountsService {
    get: () => Promise<NamedAccounts>;
}

export interface BaseDeploymentConfig {
    /** Name of contract to deploy */
    contract: string;
    /** 
     * Tags which will be used to identify the deployment, 
     * together with contract name must produce unique identifier
     * */
    tags: string[];
    /** List of contracts on which current contract depend, will be passed in getArgs function */
    dependencies?: string[];
}

export class BaseDeploymentService extends LifecycleDeploymentService {

    constructor(
        readonly config: BaseDeploymentConfig,
        readonly dependencies: DependenciesService,
        readonly accounts: AccountsService,
        deployments: DeploymentsService,
        logger: Logger,
    ){
        super(deployments, logger);

        if(config.tags.length < 1){
            throw new Error(`Contract must have at least one tag`);
        }
    }

    onResolveDependencies(): Promise<Deployment[]> {
        const {dependencies = []} = this.config

        return this.dependencies.resolve(dependencies);
    }

    async onResolveArgs(dependencies: Deployment[]): Promise<DeployArgs> {
        const accounts = await this.accounts.get();
        const {deployer} = accounts;
        
        return {
            name: this.generateContractName(),
            contract: this.config.contract,
            deployer,
            owner: deployer, // TODO: allow to override owner
            init: {
                args: await this.onResolveInitArgs(accounts, dependencies),
            }
        }
    }

    generateContractName(){
        const {contract, tags} = this.config;
        return [contract, ...tags].join('/');
    }

    /** Allow to override init method args, will be passed only one time */
    async onResolveInitArgs(accounts: NamedAccounts, dependencies: Deployment[]): Promise<Array<any>> {
        return [];
    }
    
    async afterDeploy(deployResult: DeployResult): Promise<void> {
        // can be overriden
    }

    async afterUpgrade(deployResult: DeployResult): Promise<void> {
        // can be overriden
    }
}