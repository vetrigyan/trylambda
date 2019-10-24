
const AWS = require('aws-sdk/global');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const AppSyncConfig = {
url: process.env.GRAPHQL_API_URL,
region: process.env.REGION,
auth: {
type: 'AWS_IAM',
credentials: AWS.config.credentials
},
disableOffline: true
};

const options = {
defaultOptions: {
query: {
fetchPolicy: 'network-only',
errorPolicy: 'all'
}
}
};

// Set up Apollo client
const client = new appsync.AWSAppSyncClient(AppSyncConfig, options);

exports.handler = (event, context, callback) => {

    const updateListing = gql `mutation UpdateListing($input: UpdateListingInput!) {
  updateListing(input: $input) {
    id
    title
    company
    url
    status
    favorite
    notes
    relatedDate
    contactName
    contactEmail
    contactPhoneNumber
    createdAt
    updatedAt
  }
}`;
  const vari = {
              id: "018a367e-f6d9-4387-8266-8ffc398548cb",
              notes: "No Notes at all!"
  };
        console.log('Going to invoke mutate with vari =  -----------> ' + vari);
    client.mutate({ mutation: updateListing, variables:{input: vari} })
    .then(function logData(data) {
        console.log('(Mutate): Updated Listing Data ----------->', data);
    })
    .catch(console.error);
    
    /*await client.mutate({
      updateListing,
      variables: {
        input: {
              id: "018a367e-f6d9-4387-8266-8ffc398548cb",
              notes: "Nothing at all!"
        }
      }
    });*/
    /*const mutation = gql`mutation Test($value: String!) {
          test(value: $value)
        }`;
    await graphqlClient.mutate({
      mutation,
      variables: {
        value: 'test'
      }
    });*/
        const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
    return response;
};

