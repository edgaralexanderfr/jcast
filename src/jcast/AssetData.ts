namespace jcast {
  export interface AssetData {
    sections: SectionData[];
  }

  interface SectionData {
    name: string;
    resources: ResourceData[];
  }

  interface ResourceData {
    name: string;
    url: string[2];
    type: 'material' | 'data';
  }
}
