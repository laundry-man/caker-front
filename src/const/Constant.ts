export const EMPTY_STRING: string = '';

export const ENTER_KEY: string = 'Enter';

export const BACKSPACE_KEY: string = 'Backspace';

export const RESET_ICON: string = 'X';

export const COMMENT_MAX_WIDTH: number = 50;

export const A_PIECE_OF_CAKE: string = '🍰';

export const TWO_PIECES_OF_CAKE: string = '🍰🍰';

export const THREE_PIECES_OF_CAKE: string = '🍰🍰🍰';

const Page = {
    EMPTY_PAGE: '',
    SIGN_IN: 'signin',
    SIGN_UP: 'signup',
    FORGOT_PASSWORD: 'forgotpassword',
    GEO_TAG_SEARCH: 'geotagsearch',
    TAG_SEARCH: 'tagsearch',
    TAG_SEARCH_RESULT: 'tagsearchresult',
    POST_UPLOAD: 'postupload',
    MY_POST_LIST: 'mypostlist',
    CONFIG: 'config'
} as const;

export type Page = typeof Page[keyof typeof Page];

export const EMPTY_PAGE: Page = '';

export const SIGN_IN: Page = 'signin';

export const SIGN_UP: Page = 'signup';

export const FORGOT_PASSWORD: Page = 'forgotpassword';

export const GEO_TAG_SEARCH: Page = 'geotagsearch';

export const TAG_SEARCH: Page = 'tagsearch';

export const TAG_SEARCH_RESULT: Page = 'tagsearchresult';

export const POST_UPLOAD: Page = 'postupload';

export const MY_POST_LIST: Page = 'mypostlist';

export const CONFIG: Page = 'config';