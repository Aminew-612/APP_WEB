//esta es una clase separada, es de buena practica
import NodeCache from "node-cache";

//inicializar objeto de cache
//lo que vayamos a reutilizar en otros lugares se debería colocar en clases separadas y distintas
export const cache=new NodeCache();