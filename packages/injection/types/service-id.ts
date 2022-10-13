import { Constructable } from "./constructable";

export type ServiceID<T = unknown> =
| Constructable<T>
| CallableFunction
| string;
