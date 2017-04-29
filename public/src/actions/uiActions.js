import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from './actionType';

const toggleOnClick = () => {
  const el = document.querySelector('#wrapper');
  const className = 'toggled';
  if (el.classList) {
    el.classList.toggle(className);
  }
  else {
    let classes = el.className.split(' ');
    const existingIndex = classes.indexOf(className);
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    }
    else {
      classes.push(className);
    }
    el.className = classes.join(' ');
  }
};

const switchSidebar = (status) => {
  toggleOnClick();
  return {
    type: status !== 'none' ? CLOSE_SIDEBAR : OPEN_SIDEBAR,
  };
};

export default switchSidebar;
