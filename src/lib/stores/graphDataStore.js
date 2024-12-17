
import { writable } from 'svelte/store';



export const graphDataStore = writable([

  {

    storeName: '',

    storeEmission: 0,

    userEmission: 0,

    totalEmissionSaved: 0,

  },

]);
