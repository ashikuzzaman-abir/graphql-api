import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Long
  scalar JSON

  type Action {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Trigger {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Response {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    platforms: [ResponsePlatform]
  }

  type ResponsePlatform {
    integrationId: ID
    build: Int
    localeGroups: [ResponseLocaleGroup]
  }

  type ResponseLocaleGroup {
    localeGroupId: ID
    variations: [ResponseVariation]
  }

  type ResponseVariation {
    name: String!
    responses: JSON
  }

  type ResourceTemplate {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    schema: JSON
    integrationId: String
    functionString: String
    key: String
  }


  type NodeObject {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    parents: [NodeObject]
    parentIds: [ID]
    root: Boolean
    trigger: Trigger
    triggerId: ID
    responses: [Response]
    responseIds: [ID]
    actions: [Action]
    actionIds: [ID]
    priority: Float
    compositeId: ID
    global: Boolean
    colour: String
  }

  type Query {
    node(nodeId: ID): NodeObject
    nodes: [NodeObject]
    nodesByCompositeId(compositeId: String!): [NodeObject]
    actions: [Action]
    responses: [Response]
    parentNodesByCompositeId(compositeId: String!): [NodeObject]
  }
`;
