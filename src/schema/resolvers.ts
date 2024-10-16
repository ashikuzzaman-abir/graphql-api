import { IResolvers } from '@graphql-tools/utils';
import { GraphQLLong, GraphQLJSON } from 'graphql-scalars';
import nodes from '../data/node.json';
import actions from '../data/action.json';
import responses from '../data/response.json';
import triggers from '../data/trigger.json';

export const resolvers: IResolvers = {
  Long: GraphQLLong,
  JSON: GraphQLJSON,
  Query: {
    node: (_, { nodeId }) => {
      const node = nodes.find((node) => node._id === nodeId);
      if (!node) return null;

      return {
        ...node,
        trigger: triggers.find((trigger) => trigger._id === node.trigger),
        responses: node.responses.map((responseId) =>
          responses.find((response) => response._id === responseId)
        ),
        actions: node.actions
          ? node.actions.map((actionId) =>
              actions.find((action) => action._id === actionId)
            )
          : [],
      };
    },
    nodesByCompositeId: (_, { compositeId }) => {
      return nodes.filter((node) => node.compositeId === compositeId);
    },
    actions: () => actions,
    responses: () => responses,
  },
};
