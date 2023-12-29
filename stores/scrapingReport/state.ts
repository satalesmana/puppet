interface FormFilter {
  scraping_account: String;
  task_status: String;
  task: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

interface ScrapingAccoung {
  label: String;
  value: String;
}

interface TaskList {
  label: String;
  value: String;
}

interface TaskCreatedBy {
  email: String;
  name: String;
  _id: String;
}
interface TaskInprogres {
  _id: String;
  code: String;
  initial_id: Number;
  biller_id: String;
  initial_page: Number;
  counter: Number;
  status: String;
  created_by: TaskCreatedBy;
}
interface State {
  formFilter: FormFilter;
  listTable: ListTable;
  listTableLogs: ListTable;
  taskInprogres: Array<TaskInprogres>;
  optScrapingAccount: Array<ScrapingAccoung>;
  optStatus: Array<any>;
  optTask: Array<TaskList>;
}

export default function (): State {
  return {
    formFilter: {
      scraping_account: '',
      task_status: '',
      task: '',
    },
    listTable: {
      data: [],
      pagination: {},
    },
    listTableLogs: {
      data: [],
      pagination: {},
    },
    taskInprogres: [],
    optScrapingAccount: [],
    optStatus: [
      { label: 'Open', value: 'open' },
      { label: 'In Progress', value: 'in progress' },
      { label: 'Done', value: 'done' },
      { label: 'Failed', value: 'failed' },
    ],
    optTask: [],
  };
}
