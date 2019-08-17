import { PropType } from 'vue-function-api';

export namespace PostContentType {
  export type Props = {
    slug: string;
  };

  export type PropsType = {
    slug: {
      type: PropType<Props['slug']>;
      required: true;
    };
  };
}
