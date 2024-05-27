import { Then, When } from '@cucumber/cucumber';
import assert from 'node:assert';
import request from 'supertest';
import { World } from './World';

When(
  'el usuario envía una solicitud GET al endpoint {string}',
  async function (this: World, url: string) {
    this.request = request(this.app?.getHttpServer()).get(url);
    this.response = await this.request.send();
  },
);

Then(
  'la solicitud debe ser exitosa con un código de respuesta {int}',
  async function (this: World, status: number) {
    assert.strictEqual(
      this.response?.status === status,
      true,
      `Expected status ${status}, but recieved ${this.response?.status}`,
    );
  },
);

Then(
  'el contenido de la respuesta debe ser',
  function (this: World, body: string) {
    assert.deepEqual(this.response?.body, JSON.parse(body));
  },
);
