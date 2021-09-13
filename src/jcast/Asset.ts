namespace jcast {
  export class Asset {
    private _data: AssetData = { displayLogs: true, sections: [] };
    private _assets: any = {};

    constructor({ data = { displayLogs: true, sections: [] } }: { data?: AssetData }) {
      this._data = data;
    }

    public get(section: string, name: string): any {
      if (this._assets[section] != undefined && this._assets[section][name] != undefined) {
        return this._assets[section][name];
      }

      return null;
    }

    /**
     * TODO: Create load routines for each resource type...
     * @param callback
     */
    public load(callback?: (loaded: number, total: number) => void): void {
      let total: number = this.getAssetsCount();
      let loaded: number = 0;

      if (this._data.displayLogs) {
        console.log(`${JCast.getIdentifier()}: Loading game assets...`);
      }

      for (let section of this._data.sections) {
        if (this._assets[section.name] == undefined) {
          this._assets[section.name] = {};
        }

        for (let resource of section.resources) {
          if (this._assets[section.name][resource.name] != undefined) {
            loaded++;

            if (this._data.displayLogs) {
              console.warn(`${JCast.getIdentifier()}: Skipping already loaded resource`);
            }

            continue;
          }

          switch (resource.type) {
            case 'image':
              let image: HTMLImageElement = new Image();

              image.onload = e => {
                loaded++;

                if (loaded == total) {
                  if (callback) {
                    callback(loaded, total);
                  }

                  if (this._data.displayLogs) {
                    console.log(`${JCast.getIdentifier()}: All assets loaded correctly`);
                  }
                }
              };

              image.src = resource.url;

              this._assets[section.name][resource.name] = image;
              break;
            case 'color':
              let params: object = {
                section: section.name,
                resource: resource.name,
              };

              http.get(resource.url, params, (params, data) => {
                let color: Color = new Color(data);

                this._assets[params.section][params.resource] = color;

                loaded++;

                if (loaded == total) {
                  if (callback) {
                    callback(loaded, total);
                  }

                  if (this._data.displayLogs) {
                    console.log(`${JCast.getIdentifier()}: All assets loaded correctly`);
                  }
                }
              });
              break;
            default:
              loaded++;

              if (this._data.displayLogs) {
                console.warn(`${JCast.getIdentifier()}: Resource ${resource.name} has an invalid type`);
              }
              break;
          }
        }
      }

      if (loaded == total) {
        if (callback) {
          callback(loaded, total);
        }

        if (this._data.displayLogs) {
          console.log(`${JCast.getIdentifier()}: All assets loaded correctly`);
        }
      }
    }

    public getAssetsCount(): number {
      let total: number = 0;

      this._data.sections.forEach(section => {
        section.resources.forEach(() => {
          total++;
        });
      });

      return total;
    }
  }
}
