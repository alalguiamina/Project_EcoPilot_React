export interface Site {
  id: number;
  name: string;
  location?: string;
  surface?: string;
  require_double_validation?: boolean;
  config_json?: any;
}

export interface CreateSiteRequest {
  name: string;
  require_double_validation?: boolean;
  config_json?: any;
}

export interface UpdateSiteRequest {
  name?: string;
  require_double_validation?: boolean;
  config_json?: any;
}

export interface SiteConfigItem {
  type_indicateur_id: number;
  obligatoire: boolean;
}

export interface SiteConfigUpdate {
  configs: SiteConfigItem[];
}
