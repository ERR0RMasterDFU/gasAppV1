export class Gasolinera {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public priceBiodiesel: string,
    public precioBioetanol: string,
    public price95: string,
    public priceDiesel: string,
    public priceHidro: string,
    public IdMunicipio: string,
    public IdProvincia: string,
    public municipio: string,
    public provincia: string,
    public postalCode: string,
    public latitud: string,
    public longitud: string
  ) {}
}