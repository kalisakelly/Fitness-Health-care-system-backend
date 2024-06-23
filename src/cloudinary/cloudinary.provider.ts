import { v2 } from "cloudinary";
import { ConfigService } from "@nestjs/config";
import { Provider } from "@nestjs/common";

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY', // Provide a unique token for your provider
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: "kellykalisa",
      api_key: "838466936852525",
      api_secret: "uQFKYrx6E8UB8QbQJylM2ytLlmA"
    });
  },
  inject: [ConfigService], // Inject ConfigService
};
