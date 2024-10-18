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
  parentIds: node.parents || []
});

export const resolvers: IResolvers = {
  Long: GraphQLLong,
  JSON: GraphQLJSON,
  Query: {
    node: (_, { nodeId }) => {
      try {
        const node = nodes.find((node) => node._id === nodeId);
        return node ? mapNode(node) : null;
      } catch (error) {
        console.error(`Error fetching node with ID ${nodeId}:`, error);
        throw new Error('Failed to fetch node');
      }
    },
    nodes: () => {
      try {
        return nodes.map(mapNode);
      } catch (error) {
        console.error('Error fetching nodes:', error);
        throw new Error('Failed to fetch nodes');
      }
    },
    nodesByCompositeId: (_, { compositeId }) => {
      try {
        return nodes
          .filter((node) => node.compositeId === compositeId)
          .map(mapNode);
      } catch (error) {
        console.error(
          `Error fetching nodes with composite ID ${compositeId}:`,
          error
        );
        throw new Error('Failed to fetch nodes by composite ID');
      }
    },
    parentNodesByCompositeId: (_, { compositeId }) => {
      try {
        const targetNode = nodes.find(
          (node) => node.compositeId === compositeId
        );
        return targetNode && targetNode.parents
          ? findParents(targetNode.parents).map(mapNode)
          : [];
      } catch (error) {
        console.error(
          `Error fetching parent nodes with composite ID ${compositeId}:`,
          error
        );
        throw new Error('Failed to fetch parent nodes by composite ID');
      }
    },
    actions: () => {
      try {
        return actions;
      } catch (error) {
        console.error('Error fetching actions:', error);
        throw new Error('Failed to fetch actions');
      }
    },
    responses: () => {
      try {
        return responses;
      } catch (error) {
        console.error('Error fetching responses:', error);
        throw new Error('Failed to fetch responses');
      }
    },
  },
};
