//First letter should be uppercase!
export const Market = "Eodev";

//add more market :)
export const Config =
{
    Eodev:
    { 
        Host: "eodev.com",
        DeleteButtonText: 'Sil',
        ApproveButtonText: 'Doğrula',
        EditButtonText: 'Düzenle',
        FlagButtonText: 'Bildir',
        MassResponseDeleteText: 'Toplu cevap sil',
        MassCommentDeleteText: 'Toplu yorum sil',
        MassResponseThanksText: 'Toplu teşekkür et',
        MassConfirmResponseText: 'Toplu cevap doğrula',
        MassUnconfirmResponseText: 'Toplu cevap doğrulama kaldır',
        MassApproveAllFlaggedResponsesText: 'Bildirilen içerikleri toplu onayla',
        TaskURL: "gorev",
        ProfileURL: "profil",
        GiveWarningText: "Uyarı verilsin mi?",
        ConfirmActionText: "İşlemi onaylıyor musunuz?",
        ProcessCancelled: "İşlem iptal edildi.",
        NoItemsSelected: "Herhangi bir kutucuğu işaretlemediniz.",
        PleaseWaitText: "Lütfen bekleyin, işlem sürüyor..",
        OldPageQuestionRegex: /\/gorev\/(.*)/,
        UserContentIDRegex: /\/user_content\/(\d+)/,
        OldProfileIDRegex: /https:\/\/eodev\.com\/profil\/\w+-(\d+)/,
        TaskPageRegex: /^https:\/\/eodev\.com\/users\/user_content\/\d+(?:\/tasks(?:\/[0-9]+\/0)?)?$/,
        ResponsePageRegex: /^https:\/\/eodev\.com\/users\/user_content\/\d+\/responses(?:\/[0-9]+\/0)?$/,
        CommentPageRegex: /^https:\/\/eodev\.com\/users\/user_content\/[0-9]+\/comments_tr(?:\/[0-9]+\/0)?$/
    },
    
    Brainly:
    { 
        Host: "brainly.com",
        DeleteButtonText: 'Delete',
        ApproveButtonText: 'Confirm',
        EditButtonText: 'Correct',
        FlagButtonText: 'Report',
        MassResponseDeleteText: 'Mass response delete',
        MassCommentDeleteText: 'Mass comment delete',
        MassResponseThanksText: 'Mass response thank',
        MassConfirmResponseText: 'Mass response confirm',
        MassUnconfirmResponseText: 'Mass response unconfirm',
        MassApproveAllFlaggedResponsesText: 'Mass flagged response accept',
        TaskURL: "question",
        ProfileURL: "profile",
        GiveWarningText: "Will you give warning?",
        ConfirmActionText: "Are you sure?",
        ProcessCancelled: "Cancelled by user.",
        NoItemsSelected: "There is/are no item(s) selected.",
        PleaseWaitText: "Hang on, action is processing..",
        OldPageQuestionRegex: /\/question\/(.*)/,
        UserContentIDRegex: /\/user_content\/(\d+)/,
        OldProfileIDRegex: /https:\/\/eodev\.com\/profil\/\w+-(\d+)/,
        TaskPageRegex: /^https:\/\/brainly\.com\/users\/user_content\/\d+(?:\/tasks(?:\/[0-9]+\/0)?)?$/,
        ResponsePageRegex: /^https:\/\/brainly\.com\/users\/user_content\/\d+\/responses(?:\/[0-9]+\/0)?$/,
        CommentPageRegex: /^https:\/\/brainly\.com\/users\/user_content\/[0-9]+\/comments_tr(?:\/[0-9]+\/0)?$/
    }
}