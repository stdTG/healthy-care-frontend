import { createSlice } from '@reduxjs/toolkit';

export const getModuleState = (state) => state.widget;

export const selectors = {
  getWidgets(state) {
    const { widgets } = getModuleState(state);
    return widgets;
  },
  getCurrentWidget(state) {
    const { currentWidget } = getModuleState(state);
    return currentWidget;
  },
  getMaxId(state) {
    const { maxId } = getModuleState(state);
    return maxId;
  },
  getZoomState(state) {
    const { zoom } = getModuleState(state);
    return zoom;
  },
  getResizingState(state) {
    const { resizing } = getModuleState(state);
    return resizing;
  },
};

const slice = createSlice({
  name: 'widget',
  initialState: {
    widgets: [],
    maxId: 1,
    currentWidget: {},
    zoom: 1,
    resizing: false,
  },
  reducers: {
    addWidget(state, { payload }) {
      const newWidget = {
        ...payload,
        id: payload.id ? payload.id : state.maxId.toString(),
        vertex: true,
        edge: false,
        connectable: true,
      };
      state.widgets = [...state.widgets, newWidget];
      state.currentWidget = newWidget;
      state.maxId = payload.id ? state.maxId : state.maxId + 1;
    },
    addEdge(state, { payload }) {
      const id = payload.id ? payload.id : state.maxId.toString();
      const newEdge = {
        id,
        vertex: false,
        edge: true,
        connectable: true,
        source: payload.source,
        target: payload.target,
        type: 'special',
        sourceHandle: 'main',
        style: { stroke: '#006AE3', strokeWidth: 3, cursor: 'move' },
      };
      state.widgets = [...state.widgets, newEdge];
      state.currentWidget = newEdge;
      state.maxId = payload.id ? state.maxId : state.maxId + 1;
    },
    saveWidget(state, { payload }) {
      state.widgets = state.widgets.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              ...payload,
            }
          : item
      );
    },
    removeWidgetOrAssociation(state, { payload }) {
      state.widgets = state.widgets.filter(
        (item) => item.id !== payload.id && item.parentId !== payload.id
      );
    },
    saveWidgets(state, { payload }) {
      if (payload.widgets && Array.isArray(payload.widgets)) {
        state.widgets = [...payload.widgets];
        state.maxId = payload.maxId;
      }
    },
    setZoom(state, { payload }) {
      state.zoom = payload.zoom;
    },
    setResizing(state, { payload }) {
      state.resizing = payload.resizing;
    },
  },
});

export const actions = slice.actions;
export const reducer = slice.reducer;
