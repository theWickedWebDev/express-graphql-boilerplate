export function preprocessAuthOwnedNamedPerm(config) {
  const innerResolve = config.resolve;

  return {
    ...config,
    resolve: (source, args, { userId }) => {
      // TODO: userId
      const isOwner = userId === '1';
      if (!isOwner) {
        throw new Error(`Cannot edit unowned data.`);
      }

      return innerResolve(source, args, context, info);
    }
  };
}

