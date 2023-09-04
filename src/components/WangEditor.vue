<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden; text-align: left"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>
    

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import store from "../store";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineComponent,
  reactive,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default defineComponent({
  name: "WangEditor",
  components: { Editor, Toolbar },
  setup(props, context) {
    const mode = reactive({ mode: "default" });

    // onCreated(() => {
    // mode.mode = store.getters.getDeviceType == 1 ? "default" : "simple";
    mode.mode = "simple";
    // });

    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();
    // console.log(emit);

    // 内容 HTML
    const valueHtml = ref("<p></p>");

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = "<p>首存板块发布之前必须自行验证出款</p><p>发布只能用官方网站携带出款到帐图</p><p>首存有风险风险请自理自行验证风险</p><p>套彩有百分之五十可能封号风险自理</p>";
    //   }, 1500);
    // });

    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容(限制300字以内)..." };

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      // console.log("created", editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      // console.log("change:", editor.getHtml());
      context.emit("getSendPostContent", editor.getHtml());
    };
    const handleDestroyed = (editor) => {
      // console.log("destroyed", editor);
    };
    const handleFocus = (editor) => {
      // console.log("focus", editor);
    };
    const handleBlur = (editor) => {
      // console.log("blur", editor);
      context.emit("getSendPostContent", editor.getHtml());
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      // console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      // editor.insertText("xxx");

      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false); // 返回 false ，阻止默认粘贴行为
      callback(true); // 返回 true ，继续默认的粘贴行为
    };

    const insertText = () => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.insertText("hello world");
    };

    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      console.log(editor.getHtml());
    };

    const disable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.disable();
    };

    return {
      editorRef,
      //   mode: "default", //simple
      mode: mode.mode,
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
    };
  },
});
</script> 
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
</style>