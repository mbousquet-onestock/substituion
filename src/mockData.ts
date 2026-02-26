import { OrderData } from './types';

export const MOCK_ORDER: OrderData = {
  id: "6176000009559",
  status: "Traité",
  createdAt: "12/07/2024 14:24:29",
  estimatedDelivery: "14/07/2024 18:00:00",
  client: {
    name: "Andy McIntosh",
    email: "a.mcintosh@gmail.com",
    phone: "06 30 54 86 86"
  },
  deliveryMode: {
    pickup: {
      store: "02 - Toulouse",
      email: "contact@magasin.com",
      phone: "05 61 67 69 25"
    },
    home: {
      name: "Andy McIntosh",
      address: "8 rue des Trente six ponts",
      zip: "31400",
      city: "TOULOUSE",
      country: "France"
    }
  },
  payment: {
    billingAddress: {
      name: "Andy McIntosh",
      address: "8 rue des Trente six ponts",
      zip: "31400",
      city: "TOULOUSE",
      country: "France"
    },
    methods: [
      { type: "Visa", last4: "9562", amount: 100.00 },
      { type: "Carte cadeau", last4: "9562", amount: 30.90 }
    ],
    subtotal: 130.90,
    substitutionAdjustment: 0.00,
    total: 130.90
  },
  articles: {
    delivery: [
      {
        id: "1",
        name: "Château Pape Clément - Grand Vin de Graves",
        price: 85.00,
        quantity: 1,
        unit: "75cl",
        ean: "3258691547821",
        status: "Traité",
        image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiNWM4YTA2MTAtODMxYy00Yjc3LWFhYWYtOGY1MTczMjUwY2U5LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
      }
    ],
    pickup: [
      {
        id: "2",
        name: "Onoro Primitivo | Old Vines",
        price: 18.50,
        quantity: 1,
        unit: "75cl",
        ean: "8001234567890",
        status: "Traité",
        image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiMmMwZmMyYjgtNjNhZi00YzhkLThiOWEtYjg4YjFiYTMzZDk3LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
      },
      {
        id: "3",
        name: "Senza Parole - Spumante Bianco",
        price: 14.90,
        quantity: 1,
        unit: "75cl",
        ean: "7612345678901",
        status: "Traité",
        image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiNzMwMjBhNjItMzk3Yy00MWU0LWI5ZjEtNWY0YTMzOTA4OGQ2LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
      },
      {
        id: "4",
        name: "Blanche Sicilia Grillo DOC - Compagnia Siciliana - 2020",
        price: 12.50,
        quantity: 1,
        unit: "75cl",
        ean: "8056789012345",
        status: "Substitué",
        image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiZGNlOTdlNjEtNTAzMS00ZjZjLTk3NzUtNjg2NWJkMGFkMjYzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp",
        substitutedBy: {
          id: "5",
          name: "Blanche Sicilia Grillo DOC - Compagnia Siciliana - 2021",
          price: 12.50,
          quantity: 1,
          unit: "75cl",
          ean: "8056789012345",
          status: "Traité",
          image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiZGNlOTdlNjEtNTAzMS00ZjZjLTk3NzUtNjg2NWJkMGFkMjYzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
        }
      }
    ]
  },
  packages: [
    {
      id: "6176000009559-1",
      status: "Traité",
      location: "02 - Toulouse",
      email: "contact@magasin.com",
      phone: "05 61 67 69 25",
      items: [
        {
          id: "2",
          name: "Onoro Primitivo | Old Vines",
          price: 18.50,
          quantity: 1,
          unit: "75cl",
          ean: "8001234567890",
          status: "Traité",
          image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiMmMwZmMyYjgtNjNhZi00YzhkLThiOWEtYjg4YjFiYTMzZDk3LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
        },
        {
          id: "3",
          name: "Senza Parole - Spumante Bianco",
          price: 14.90,
          quantity: 1,
          unit: "75cl",
          ean: "7612345678901",
          status: "Traité",
          image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiNzMwMjBhNjItMzk3Yy00MWU0LWI5ZjEtNWY0YTMzOTA4OGQ2LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
        },
        {
          id: "4",
          name: "Blanche Sicilia Grillo DOC - Compagnia Siciliana - 2020",
          price: 12.50,
          quantity: 1,
          unit: "75cl",
          ean: "8056789012345",
          status: "Substitué",
          image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiZGNlOTdlNjEtNTAzMS00ZjZjLTk3NzUtNjg2NWJkMGFkMjYzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp",
          substitutedBy: {
            id: "5",
            name: "Blanche Sicilia Grillo DOC - Compagnia Siciliana - 2021",
            price: 12.50,
            quantity: 1,
            unit: "75cl",
            ean: "8056789012345",
            status: "Traité",
            image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiZGNlOTdlNjEtNTAzMS00ZjZjLTk3NzUtNjg2NWJkMGFkMjYzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
          }
        }
      ]
    },
    {
      id: "6176000009559-2",
      status: "Traité",
      location: "02 - Toulouse",
      email: "contact@magasin.com",
      phone: "05 61 67 69 25",
      shippingInfo: {
        date: "13/07/2024",
        method: "Colissimo",
        tracking: "9V31829479968"
      },
      items: [
        {
          id: "1",
          name: "Château Pape Clément - Grand Vin de Graves",
          price: 85.00,
          quantity: 1,
          unit: "75cl",
          ean: "3258691547821",
          status: "Traité",
          image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Images/Flaschenpost/eyJidWNrZXQiOiJzcGluZS1wcm9kdWN0LWltYWdlcy1wcm9kIiwia2V5IjoiNWM4YTA2MTAtODMxYy00Yjc3LWFhYWYtOGY1MTczMjUwY2U5LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJoZWlnaHQiOjgwMH0sInRyaW0iOjAuMX19.webp"
        }
      ]
    }
  ],
  history: [
    {
      date: "26/10/21",
      time: "12:15:53",
      title: "Modification règle d'orchestration",
      description: "La règle d'orchestration a changé. Nouvelle règle : 1"
    },
    {
      date: "26/10/21",
      time: "12:15:53",
      title: "Exécution de la captation automatique",
      description: "L'action de captation automatique \"claim_with_destination\" s'est exécutée"
    },
    {
      date: "26/10/21",
      time: "12:15:53",
      title: "Création colis",
      description: "Colis 63bec386d232491df32e2752 créé"
    }
  ]
};
