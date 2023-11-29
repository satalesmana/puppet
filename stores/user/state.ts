interface State {
  formInput: FormInput;
  listTable: ListTable;
}

interface FormInput {
  name: String;
  email: String;
  password: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

export default function (): State {
  return {
    formInput: {
      name: '',
      email: '',
      password: '',
    },
    listTable: {
      data: [],
      pagination: {},
    },
  };
}
