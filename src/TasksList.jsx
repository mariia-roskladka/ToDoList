import React from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import { createTask, fetchTasksList, updateTask, deleteTask } from './tasksGateway.jsx';

class TasksList extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    fetchTasksList().then(tasksList => {
      this.setState({
        tasks: tasksList,
      });
    });
  };

  onCreate = text => {
    // 1.create task object
    // 2.post object to server
    // 3.fetch list from server
    // const { tasks } = this.state;
    const newTask = {
      text,
      done: false,
    };

    return createTask(newTask).then(() => this.fetchTasks());
  };

  handleTaskStatusChange = id => {
    //  1.find task in a list
    // 2.create updated task
    //  3.update task on server
    //  4.fetch updated tasks list
    const { done, text } = this.state.tasks.find(task => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };
    updateTask(id, updatedTask).then(() => this.fetchTasks());

    // const taskToUpdate = this.state.tasks.find(task => task.id === id);
    // const updatedTask = {
    //   ...taskToUpdate,
    //   done: !taskToUpdate.done,
    //   };

    // .map(task => {
    //   if (task.id === id) {
    //     return {
    //       ...task,
    //       done: !task.done,
    //     };
    //   }
    //   return task;
    // });
    // this.setState({ tasks: updatedTasks });
  };

  handleTaskDelete = id => {
    //   1.filter tasks
    //  2. update tasks

    deleteTask(id).then(() => this.fetchTasks());
  };

  render() {
    const sortedList = this.state.tasks.slice().sort((a, b) => a.done - b.done);
    return (
      <main className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map(task => (
            <Task
              key={task.id}
              {...task}
              onChange={this.handleTaskStatusChange}
              onDelete={this.handleTaskDelete}
            />

            // <Task id={task.id} text={task.text} done={task.done} />
          ))}
        </ul>
      </main>
    );
  }
}

export default TasksList;
