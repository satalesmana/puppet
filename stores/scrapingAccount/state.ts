interface FormInput {
  _id: String | null;
  name: String;
  type: String;
  email: String;
  password: String;
  phone: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

interface AccountType {
  label: String;
  value: String;
}

interface State {
  formInput: FormInput;
  listTable: ListTable;
  optAccountType: Array<AccountType>;
}

export default function (): State {
  return {
    formInput: {
      _id: null,
      name: '',
      type: '',
      email: '',
      password: '',
      phone: '',
    },
    listTable: {
      data: [],
      pagination: {},
    },
    optAccountType: [
      { label: 'Jobstreet.com', value: 'jobstreet' },
      { label: 'kupu.id', value: 'kupu' },
    ],
  };
}
