export class Gasolinera {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public price95: number,
    public priceDiesel: number,
    public priceHidro: number,
    public IdMunicipio: string,
    public IdProvincia: string,
    public municipio: string,
    public provincia: string,
    public postalCode: string
  ) {}
}