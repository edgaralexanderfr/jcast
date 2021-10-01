namespace jcast {
  type OnLoadCallback = ((loaded: number, total: number, asset?: any) => void) | null;

  export class Asset {
    private _data: AssetData = { sections: [] };
    private _assets: any = {};
    private _onload: OnLoadCallback = null;

    constructor({ data = { sections: [] } }: { data?: AssetData }) {
      this._data = data;
    }

    public get(section: string, name: string): any {
      if (this._assets[section] != undefined && this._assets[section][name] != undefined) {
        return this._assets[section][name];
      }

      return null;
    }

    public onload(onload: OnLoadCallback): void {
      this._onload = onload;
    }

    public load(callback?: (loaded: number, total: number) => void): void {
      let total: number = this.getAssetsCount();
      let loaded: number = 0;

      this.logLoadingGameAssets();

      for (let section of this._data.sections) {
        if (this._assets[section.name] == undefined) {
          this._assets[section.name] = {};
        }

        for (let resource of section.resources) {
          if (this._assets[section.name][resource.name] != undefined) {
            loaded += resource.url.length;

            if (this._onload) this._onload(loaded, total);
            this.logSkippingAlreadyLoadedResource();

            continue;
          }

          switch (resource.type) {
            case 'material':
              this._assets[section.name][resource.name] = new Material();

              if (resource.url.length > 0) {
                this.loadTexture(resource.url[0], section, resource, (section, resource, texture) => {
                  this._assets[section.name][resource.name].texture = texture;

                  loaded++;

                  if (this._onload) this._onload(loaded, total, texture);
                  this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                });
              }

              if (resource.url.length > 1) {
                this.loadColor(resource.url[1], section, resource, (section, resource, color) => {
                  this._assets[section.name][resource.name].color = color;

                  loaded++;

                  if (this._onload) this._onload(loaded, total, color);
                  this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                });
              }
              break;
            case 'data':
              this._assets[section.name][resource.name] = {};

              if (resource.url.length > 0) {
                this.loadData(resource.url[0], section, resource, (section, resource, data) => {
                  this._assets[section.name][resource.name] = data;

                  loaded++;

                  if (this._onload) this._onload(loaded, total, data);
                  this.logAllAssetsLoadedCorrectly(loaded, total, callback);
                });
              }
              break;
            default:
              loaded += resource.url.length;

              if (this._onload) this._onload(loaded, total);
              this.logResourceHasAnInvalidType(resource.name);
              break;
          }
        }
      }

      this.logAllAssetsLoadedCorrectly(loaded, total, callback);
    }

    public getAssetsCount(): number {
      let total: number = 0;

      this._data.sections.forEach(section => {
        section.resources.forEach(resource => {
          total += resource.url.length;
        });
      });

      return total;
    }

    private loadTexture(url: string, section: any, resource: any, callback?: (section: any, resource: any, texture: Texture) => void): void {
      let image: HTMLImageElement = new Image();

      image.onload = e => {
        let texture: Texture = new Texture({ image });

        if (callback) {
          callback(section, resource, texture);
        }
      };

      image.src = url;
    }

    private loadColor(url: string, section: any, resource: any, callback?: (section: any, resource: any, color: Color) => void): void {
      http.get(url, data => {
        let color: Color = new Color(data);

        if (callback) {
          callback(section, resource, color);
        }
      });
    }

    private loadData(url: string, section: any, resource: any, callback?: (section: any, resource: any, data: any) => void): void {
      http.get(url, data => {
        if (callback) {
          callback(section, resource, data);
        }
      });
    }

    private logLoadingGameAssets(): void {
      Console.log('Loading game assets...');
    }

    private logSkippingAlreadyLoadedResource(): void {
      Console.warn('Skipping already loaded resource');
    }

    private logResourceHasAnInvalidType(name: string): void {
      Console.warn(`Resource ${name} has an invalid type`);
    }

    private logAllAssetsLoadedCorrectly(loaded: number, total: number, callback?: (loaded: number, total: number) => void): void {
      if (loaded >= total) {
        Console.log('All assets loaded correctly');

        if (callback) {
          callback(loaded, total);
        }
      }
    }
  }
}
