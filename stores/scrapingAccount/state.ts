interface FormInput {
  name: String;
  type: String;
  email: String;
  password: String;
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
      name: '',
      type: '',
      email: '',
      password: '',
    },
    listTable: {
      data: [],
      pagination: {},
    },
    optAccountType: [{ label: 'Jobstreet.com', value: 'jobstreet' }],
  };
}
