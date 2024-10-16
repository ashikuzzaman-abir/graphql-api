import { IResolvers } from '@graphql-tools/utils';
import { GraphQLLong, GraphQLJSON } from 'graphql-scalars';
import nodes from '../data/node.json';
import actions from '../data/action.json';
import responses from '../data/response.json';
import triggers from '../data/trigger.json';

const findTrigger = (triggerId: string) =>
  triggers.find((trigger) => trigger._id === triggerId) || null;
const findActions = (actionIds: string[]) =>
  actionIds
    .map((actionId) => actions.find((action) => action._id === actionId))
    .filter(Boolean);
const findResponses = (responseIds: string[]) =>
  responseIds
    .map((responseId) =>
      responses.find((response) => response._id === responseId)
    )
    .filter(Boolean);
const findParents = (parentIds: string[]) =>
  parentIds
    .map((parentId) => nodes.find((node) => node.compositeId === parentId))
    .filter(Boolean);

const mapNode = (node: any) => ({
  ...node,
  trigger: node.trigger ? findTrigger(node.trigger) : null,
  actions: node.actions ? findActions(node.actions) : [],
  responses: node.responses ? findResponses(node.responses) : [],
  parents:
    node.parents && node.parents.length > 0 ? findParents(node.parents) : [],
});

export const resolvers: IResolvers = {
  Long: GraphQLLong,
  JSON: GraphQLJSON,
  Query: {
    node: (_, { nodeId }) => {
      const node = nodes.find((node) => node._id === nodeId);
      return node ? mapNode(node) : null;
    },
    nodes: () => nodes.map(mapNode),
    nodesByCompositeId: (_, { compositeId }) =>
      nodes.filter((node) => node.compositeId === compositeId).map(mapNode),
    parentNodesByCompositeId: (_, { compositeId }) => {
      const targetNode = nodes.find((node) => node.compositeId === compositeId);
      return targetNode && targetNode.parents
        ? findParents(targetNode.parents).map(mapNode)
        : [];
    },
    actions: () => actions,
    responses: () => responses,
  },
};
