var donoChoice = 1
var username;
var donor = 'edger';

if(donoChoice == 1)
{
    username = 'receiver';
}
else
{
    username = 'Divo';
}

const {
    createAuthenticatedClient,
    OpenPaymentsClientError,
    isFinalizedGrant,
  } = require("@interledger/open-payments");
  const readline =require( "readline/promises");
  
module.exports = {pay: async () => {
    const client = await createAuthenticatedClient({
        walletAddressUrl: `https://ilp.interledger-test.dev/${donor}`,
        privateKey:`-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIKlACsoZ3AGLc8hAQyE+bx7sUWtkL3LOHB8evflfZ6bR
-----END PRIVATE KEY-----`,
        keyId: '9bd98d6f-a480-4a5c-b781-0d3dfa7cd267',
      });
  
    const sendingWalletAddress = await client.walletAddress.get({
      url: `https://ilp.interledger-test.dev/${donor}`, // Make sure the wallet address starts with https:// (not $)
    });
    const receivingWalletAddress = await client.walletAddress.get({
      url: `https://ilp.interledger-test.dev/${username}`, // Make sure the wallet address starts with https:// (not $)
    });
  
    console.log(
      "Got wallet addresses. We will set up a payment between the sending and the receiving wallet address",
      { receivingWalletAddress, sendingWalletAddress }
    );
  
    // Step 1: Get a grant for the incoming payment, so we can create the incoming payment on the receiving wallet address
    const incomingPaymentGrant = await client.grant.request(
      {
        url: receivingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: "incoming-payment",
              actions: ["read", "complete", "create"],
            },
          ],
        },
      }
    );
  
    console.log(
      "\nStep 1: got incoming payment grant for receiving wallet address",
      incomingPaymentGrant
    );
  
    // Step 2: Create the incoming payment. This will be where funds will be received.
    const incomingPayment = await client.incomingPayment.create(
      {
        url: receivingWalletAddress.resourceServer,
        accessToken: incomingPaymentGrant.access_token.value,
      },
      {
        walletAddress: receivingWalletAddress.id,
        incomingAmount: {
          assetCode: receivingWalletAddress.assetCode,
          assetScale: receivingWalletAddress.assetScale,
          value: "1000",
        },
      }
    );
  
    console.log(
      "\nStep 2: created incoming payment on receiving wallet address",
      incomingPayment
    );
  
    // Step 3: Get a quote grant, so we can create a quote on the sending wallet address
    const quoteGrant = await client.grant.request(
      {
        url: sendingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: "quote",
              actions: ["create", "read"],
            },
          ],
        },
      }
    );
  
    console.log(
      "\nStep 3: got quote grant on sending wallet address",
      quoteGrant
    );
  
    // Step 4: Create a quote, this gives an indication of how much it will cost to pay into the incoming payment
    const quote = await client.quote.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: quoteGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        receiver: incomingPayment.id,
        method: "ilp",
      }
    );
  
    console.log("\nStep 4: got quote on sending wallet address", quote);
  
    // Step 5: Start the grant process for the outgoing payments.
    // This is an interactive grant: the user (in this case, you) will need to accept the grant by navigating to the outputted link.
    const outgoingPaymentGrant = await client.grant.request(
      {
        url: sendingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: "outgoing-payment",
              actions: ["read", "create"],
              limits: {
                debitAmount: {
                  assetCode: quote.debitAmount.assetCode,
                  assetScale: quote.debitAmount.assetScale,
                  value: quote.debitAmount.value,
                },
              },
              identifier: sendingWalletAddress.id,
            },
          ],
        },
        interact: {
          start: ["redirect"],
          finish: {
            method: "redirect",
            // This is where you can (optionally) redirect a user to after going through interaction.
            // Keep in mind, you will need to parse the interact_ref in the resulting interaction URL,
            // and pass it into the grant continuation request.
            uri: "http://localhost:5173/charities",
            nonce: crypto.randomUUID(),
          },
        },
      }
    );
  
    console.log(
      "\nStep 5: got pending outgoing payment grant",
      outgoingPaymentGrant
    );
    console.log(
      "Please navigate to the following URL, to accept the interaction from the sending wallet:"
    );
    return outgoingPaymentGrant.interact.redirect;
  }};