import { includes, isNil } from 'ramda';
import jsonCodec from '../../Builder/TabBuild/utils/jsonCodec';

const useGetJson = (graph: any) => {

  const stringifyWithoutNesting = (json: { graph: string}) => {
    return JSON.stringify(
      json,
      (key, value) => {
        const nestedObjects = ['parent', 'source', 'target'];

        if (includes(key, nestedObjects) && !isNil(value)) {
          return value.id;
        }
        return value;
      },
      4
    );
  };

  const getJsonModel = (graph: any) => {
    if (!graph) {
      return
    }

    const encoder = new jsonCodec();
    const model = graph?.getModel();
    console.log(model, 'modeeeel');

    const jsonModel = encoder.decode(graph?.getModel());
    console.log(jsonModel, 'JSONMODEL');
    return stringifyWithoutNesting({
      graph: jsonModel,
    });
  };

  const getJson = () => {
    const result = getJsonModel(graph);
    console.log(result);
    return result;
  };

  // const onSave = () => {
  //   const result = getJsonModel(graph);
  //
  //   try {
  //     save({
  //       graph: JSON.parse(result).graph,
  //       title: 'new' + new Date().getTime(),
  //     });
  //   } catch (e) {
  //     console.error('Error on save json', e);
  //   }
  // };

  return {
    getJson,
  }
}

export default useGetJson
