namespace jcast {
  export interface AssetData {
    displayLogs: boolean;
    sections: SectionData[];
  }

  interface SectionData {
    name: string;
    resources: ResourceData[];
  }

  interface ResourceData {
    name: string;
    url: string | string[2];
    type: 'image' | 'color';
  }
}
