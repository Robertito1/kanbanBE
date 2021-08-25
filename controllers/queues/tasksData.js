// Data, events and colors matched with examples provided
const DemoUserData1 = {
  taskId: 1,
  title: 'Research',
  resource: 'green',
  start: new Date(2020, 0, 2),
  end: new Date(2020, 0, 2),
};
const DemoUserData2 = {
  taskId: 2,
  title: 'Practice exam',
  resource: 'red',
  start: new Date(2020, 0, 3),
  end: new Date(2020, 0, 3),
};
const DemoUserData3 = {
  taskId: 3,
  title: 'Essay on environment',
  resource: 'green',
  start: new Date(2020, 0, 7),
  end: new Date(2020, 0, 7),
};
const DemoUserData4 = {
  taskId: 4,
  title: 'Workshop',
  resource: 'orange',
  start: new Date(2020, 0, 7),
  end: new Date(2020, 0, 7),
};
const DemoUserData5 = {
  taskId: 5,
  title: 'Midterm exam',
  resource: 'red',
  start: new Date(2020, 0, 9),
  end: new Date(2020, 0, 9),
};
const DemoUserData6 = {
  taskId: 6,
  title: 'Practice exam',
  resource: 'red',
  start: new Date(2020, 0, 15),
  end: new Date(2020, 0, 15),
};
const DemoUserData7 = {
  taskId: 7,
  title: 'Three days task test',
  resource: 'brown',
  start: new Date(2020, 0, 20),
  end: new Date(2020, 0, 23),
};
const tasks1 = [
  DemoUserData1,
  DemoUserData2,
  DemoUserData3,
  DemoUserData4,
  DemoUserData5,
  DemoUserData6,
  DemoUserData7,
];

const OtherUserData1 = {
  taskId: 8,
  title: 'New course',
  resource: 'green',
  start: new Date(2021, 10, 2),
  end: new Date(2021, 10, 2),
};
const OtherUserData2 = {
  taskId: 9,
  title: 'New test',
  resource: 'red',
  start: new Date(2021, 10, 3),
  end: new Date(2021, 10, 3),
};

const tasks2 = [
  OtherUserData1,
  OtherUserData2
];
const DemoUser = {
    userId: 1,
    email: 'hapalacios@icloud.com',
    tasks: tasks1
}
const OtherUser = {
    userId: 2,
    email: 'otherEmail@icloud.com',
    tasks: tasks2
}

const tasksData = [
  DemoUser,
  OtherUser,
];

module.exports = { tasksData };