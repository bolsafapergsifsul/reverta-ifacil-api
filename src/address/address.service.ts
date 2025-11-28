import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

interface ViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface GoogleGeoResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

@Injectable()
export class AddressService {
  async getCompleteAddress(zipCode: string, numberAddress: string) {
    // -------------------------
    // 1. VIA CEP
    // -------------------------
    const viaCepUrl = `https://viacep.com.br/ws/${zipCode}/json/`;

    const viacep = await axios
      .get<ViaCepResponse>(viaCepUrl)
      .then((response) => response.data);

    if (!viacep || viacep.erro) {
      throw new HttpException('CEP inválido', 400);
    }

    // -------------------------
    // 2. FORMATA O ENDEREÇO
    // -------------------------
    const formattedAddress = `${viacep.logradouro}, ${numberAddress}, ${viacep.bairro}, ${viacep.localidade}, ${viacep.uf}, Brasil`;

    // -------------------------
    // 3. GOOGLE GEOCODING
    // -------------------------
    const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

    const geoLocation = await axios
      .get<GoogleGeoResponse>(googleUrl, {
        params: {
          address: formattedAddress,
          key: process.env.GOOGLE_API_KEY,
        },
      })
      .then((response) => response.data);

    if (!geoLocation || geoLocation.results.length === 0) {
      throw new HttpException('Não foi possível obter latitude/longitude', 400);
    }

    const location = geoLocation.results[0].geometry.location;

    // -------------------------
    // 4. RETORNO FINAL
    // -------------------------
    return {
      zipCode,
      street: viacep.logradouro,
      neighborhood: viacep.bairro,
      city: viacep.localidade,
      state: viacep.uf,
      numberAddress,
      latitude: location.lat,
      longitude: location.lng,
    };
  }
}
