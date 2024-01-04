interface Compose {
  mode: String;
  to: String;
  subject: String;
  task: String;
  message: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

interface State {
  compose: Compose;
  optTask: Array<[]>;
  listTable: ListTable;
}
export default function (): State {
  return {
    compose: {
      mode: 'manual', // manual //task
      to: '',
      subject: '',
      task: '',
      message: '',
    },
    optTask: [],
    listTable: {
      data: [],
      pagination: {},
    },
  };
}
