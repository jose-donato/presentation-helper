import firebase from './firebase';

const firestore = firebase.firestore();

export async function createRoom(slug, data) {
    const exists = await checkIfRoomExists(slug)
    if (!exists) {
        await firestore.collection('rooms').doc(slug).set({ ...data, created: firebase.firestore.FieldValue.serverTimestamp() });
        return true;
    }
    return false;
}

function compareByMs(a, b) {
    if (a.date.ms > b.date.ms) {
        return -1;
    }
    if (a.date.ms < b.date.ms) {
        return 1;
    }
    return 0;
}


export async function getRoom(slug) {
    const doc = await firestore.collection('rooms').doc(slug).get();
    const { created } = doc.data()
    const room = { id: doc.id, created: created.toDate().toString() };
    //const logs = []
    //const docsIds = []
    const snapshotLogs = await firestore.collection('rooms').doc(slug).collection('logs').orderBy('created', 'desc').get()
    room['logs'] = snapshotLogs.docs.map(snap => {
        const id = snap.id;
        const { created, link, language, snippet, type } = snap.data()
        if (!created) {
            return;
        }
        let obj
        if (type === "link") {
            obj = {
                id,
                type: type,
                date: {
                    ms: created.toDate().getTime(),
                    string: created.toDate().toUTCString()
                },
                link,
            }
        } else if (type === "snippet") {
            obj = {
                id,
                type: type,
                date: {
                    ms: created.toDate().getTime(),
                    string: created.toDate().toUTCString()
                },
                snippet,
                language
            }
        }
        return obj
    })
    /*const snapshotLinks = await firestore.collection('rooms').doc(slug).collection('links').orderBy('created', 'desc').get()
    snapshotLinks.forEach(snap => {
        const { created, link } = snap.data()
        const id = snap.id;
        docsIds.push(id);
        logs.push({ id, type: "link", date: { ms: created.toDate().getTime(), string: created.toDate().toUTCString() }, link })
    })
    const snapshotSnippets = await firestore.collection('rooms').doc(slug).collection('snippets').orderBy('created', 'desc').get()
    snapshotSnippets.forEach(snap => {
        const { language, snippet, created } = snap.data()
        const id = snap.id;
        docsIds.push(id);
        logs.push({ id, type: "snippet", date: { ms: created.toDate().getTime(), string: created.toDate().toUTCString() }, language, snippet })
    })
    logs.sort(compareByMs)
    console.log(logs)*/
    //room['logs'] = logs
    //room['docsIds'] = docsIds*/
    return room;
}

export async function checkIfRoomExists(slug) {
    const room = await firestore.collection('rooms').doc(slug).get()
    return room.exists
}

export async function getRoomsPaths() {
    const snapshot = await firestore.collection('rooms').get();
    const paths = [];
    snapshot.forEach((doc) => {
        paths.push({
            params: {
                slug: doc.id
            }
        });
    });
    return paths;
}

export const getRoomCollection = (slug, collection) => {
    return firestore.collection('rooms')
        .doc(slug)
        .collection(collection)
        .orderBy('created', 'desc')
        .get();
}

export const streamRoomCollection = (slug, observer, collection) => {
    return firestore.collection('rooms')
        .doc(slug)
        .collection(collection)
        .orderBy('created', 'desc')
        .onSnapshot(observer);
};

export const addCollectionItemToRoom = (data, slug, collection) => {
    return firestore.collection('rooms').doc(slug).collection(collection).add({
        ...data,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
};