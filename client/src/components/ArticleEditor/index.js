import React, { useRef, useEffect } from 'react'
import EditorJS from "@editorjs/editorjs"
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import { Button, Form, Input, Select } from 'antd'

import clz from './index.module.scss'
import { httpErrorHandler } from '../notification'
import { createArticle } from '../../http/articleAPI'

const { Option } = Select
const { TextArea } = Input


const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Новая статья",
                "level": 1
            }
        },

    ]
}

// {
//     "type" : "image",
//     "data" : {
//         "file": {
//             "url" : "http://localhost:5000/1.jpg"
//         },
//         "caption" : "Супер картинка",
//         "withBorder" : false,
//         "withBackground" : false,
//         "stretched" : true
//     }
// }


export default function ArticleEditor({ readOnly }) {

    const ejInstance = useRef()

    const initEditor = () => {

        const editor = new EditorJS({

            holder: 'editorjs',
            readOnly,

            onReady: () => {
                ejInstance.current = editor;
            },

            // autofocus: true,
            data: DEFAULT_INITIAL_DATA,

            onChange: async () => {
                let content = await editor.saver.save();
                console.log(content);
            },

            tools: {
                header: {
                    class: Header,
                    config: {
                        placeholder: 'Введите заголовок',
                        levels: [1, 2, 3, 4],
                        defaultLevel: 4
                    }
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:5000/api/upload/image', // Your backend file uploader endpoint
                            // byUrl: 'http://localhost:5000', // Your endpoint that provides uploading by Url
                        }
                    }
                }
            },
        })

    };

    useEffect(() => {

        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        }

    }, [])

    const saveData = async () => {

        const article = await ejInstance.current.save();
        console.log('Article data: ', article)

        try {
            await createArticle(article)
        } catch (e) {
            console.log(e)
            httpErrorHandler(e)
        }

    }

    return <div className={clz.articleContainer}>

        <Form name="article" className={clz.articleForm}>

            <Form.Item
                label="Название статьи"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Введите название статьи',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Описание статьи"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Введите описание статьи',
                    },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label="Ключевые слова"
                name="keywords"
                rules={[
                    {
                        required: true,
                        message: 'Введите ключевые слова',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Категория статьи"
                name="cat"
                rules={[
                    {
                        required: true,
                        message: 'Введите категорию статьи',
                    },
                ]}
            >
                <Select
                    placeholder="Выберите категорию статьи"
                >
                    <Option value="work">Работа</Option>
                    <Option value="health">Здоровье</Option>
                    <Option value="hobby">Хобби</Option>
                </Select>
            </Form.Item>


        </Form>

        <div id='editorjs'></div>
        {!readOnly && <Button className={clz.saveBtn} onClick={saveData} type="primary">Опубликовать</Button>}
    </div>

}