import { Type } from '@sinclair/typebox';

export const userBodySchema = Type.Object({
  name: Type.String(),
  email: Type.String(),
});