
(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var RichText = wp.blockEditor.RichText;

    /*吹き出しブロック*/
    registerBlockType('my-block/speech', {
        title: '吹き出し',
        icon: 'admin-comments',
        category: 'text',
        attributes: {
            content: {
                type: 'array',
                source: 'children',
                selector: 'p',
            }
        },
        edit: (props) => {
            var blockProps = useBlockProps({ className: "speech-editor" });
            var content = props.attributes.content;
            function onChangeContent(newContent) {
                props.setAttributes({ content: newContent });
            }
            return el(
                'div',
                blockProps,
                el(
                    RichText,
                    {
                        tagName: 'p',
                        onChange: onChangeContent,
                        value: content,
                        placeholder: '吹き出しのテキストを入力'
                    }
                )
            );
        },
        save: (props) => {
            var blockProps = useBlockProps.save({ className: "speech-block" });
            return el(
                'div',
                blockProps,
                el(RichText.Content,
                    {
                        tagName: 'p',
                        value: props.attributes.content,
                    })
            );
        }
    });

})(wp);